// Load dependencies
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const Jimp = require("jimp");
const streamifier = require("streamifier");

// create multer storage engine
const AvatarStorage = function (options, uploadPath, baseUrl) {
    class AvatarStorage {
        // constructor function
        constructor(opts) {
            // const baseUrl = process.env.AVATAR_BASE_URL;
            const allowedStorageSystems = ["local"];
            const allowedOutputFormats = ["jgp", "png"];
            // fallback for options
            const defaultOptions = {
                storage: "local",
                output: "png",
                greyscale: false,
                quality: 70,
                square: true,
                threshold: 500,
                responsive: false,
            };
            // extend default options with passed options
            let options = Object.entries(opts).reduce(
                (acc, curr) => (
                    curr[0] in defaultOptions ? (acc[curr[0]] = curr[1]) : acc,
                    acc
                ),
                {}
            );
            options = { ...defaultOptions, ...options };

            // TODO: check the options for correct values and use fallbacks where necessary

            this.options = options;
            this.uploadPath = this.options.responsive
                ? path.join(uploadPath, "responsive")
                : uploadPath;
            this.uploadBaseUrl = this.options.responsive
                ? path.join(baseUrl, "responsive")
                : baseUrl;
            if (this.options.storage === "local") {
                // if upload path does not exist, create the upload path structure
                !fs.existsSync(this.uploadPath) &&
                    fs.mkdirSync(
                        this.uploadPath,
                        { recursive: true },
                        (err, path) => {
                            if (err) throw err;
                            console.log(this.uploadBaseUrl, this.uploadPath);
                            console.log("help me");
                        }
                    );
            }
        }

        // DESCRIPTION: generates random cryptographic filename
        _generateRandomFilename() {
            // creaate pseudo random bytes
            const bytes = crypto.randomBytes(32);

            // create SHA-256 hash of the random bytes
            const checksum = crypto
                .createHash("sha256")
                .update(bytes)
                .digest("hex");

            // return the hash with the output extension as the filename
            return `${checksum}.${this.options.output}`;
        }
        // DESCRIPTION: creates a writable stream, for a filepath
        _createOutputStream(filepath, cb) {
            // create a writable stream from the filepath
            const output = fs.createWriteStream(filepath);

            // set callback fn as handler for the error event
            output.on("error", cb);

            // set handler for the finish event
            output.on("finish", () => {
                cb(null, {
                    destination: this.uploadPath,
                    baseUrl: this.uploadBaseUrl,
                    filename: path.basename(filepath),
                    storage: this.options.storage,
                });
            });
            // return the output stream
            return output;
        }
        // process the Jimp image buffer
        _processImage(image, cb) {
            // create a reference for this to use in local functions

            // the responsive sizes
            const sizes = { sm: 0.3, md: 0.7, lg: 1 };

            let filename = this._generateRandomFilename();
            // reslove the Jimp output mime type
            const mime =
                this.options.output === "jpg" ? Jimp.MIME_JPEG : Jimp.MIME_PNG;
            let clone = image.clone();

            // fetch the Jimp image dimensions
            const width = clone.bitmap.width;
            const height = clone.bitmap.height;
            let square = Math.min(width, height);
            const threshold = this.options.threshold;

            // auto scale the image dimension to fit the threshold requirement
            if (threshold && square > threshold) {
                clone =
                    square === width
                        ? clone.resize(threshold, Jimp.AUTO)
                        : clone.resize(Jimp.AUTO, threshold);
                square = Math.min(square, threshold);
            }

            // crop image to a square if enabled
            if (this.options.square) {
                clone = clone.crop(
                    (clone.bitmap.width % square) / 2,
                    (clone.bitmap.height % square) / 2,
                    square,
                    square
                );
            }
            // convert the image to greyscale if enabled
            if (this.options.greyscale) {
                clone = clone.greyscale();
            }
            // set image output quality
            clone = clone.quality(this.options.quality);
            //    map throug the responsive sizes and push them to the batch
            const batch = (this.options.responsive &&
                Object.entries(sizes).reduce((acc, curr) => {
                    let filepath = filename.split(".");
                    // create the complete filepath and create a writable stream for it
                    filepath = `${filepath[0]}_${curr[0]}.${filepath[1]}`;
                    filepath = path.join(this.uploadPath, filepath);
                    const outputStream = this._createOutputStream(filepath, cb);
                    acc.push({
                        stream: outputStream,
                        image: clone.clone().scale(curr[1]),
                    });
                    return acc;
                }, [])) || [
                {
                    stream: this._createOutputStream(
                        path.join(this.uploadPath, filename),
                        cb
                    ),
                    image: clone,
                },
            ];

            // process the batch sequence
            batch.forEach((curr) => {
                // get the buffer of the Jimp image using the output mime type
                curr.image.getBuffer(mime, (err, buffer) => {
                    if (this.options.storage === "local") {
                        // create a read stream from the buffer and pipe it to the output stream
                        console.time("readable");
                        streamifier.createReadStream(buffer).pipe(curr.stream);
                        console.timeEnd("readable");
                    }
                });
            });
        }
        // multer requires this for handling the uploaded file
        _handleFile(req, file, cb) {
            // create a reference for this to be used in local functions

            console.time("stream");
            // concatenate the data from the file stream into a sinlge buffer
            let buffer = [];
            file.stream
                .on("data", (chunk) => {
                    buffer.push(chunk);
                })
                .on("end", async () => {
                    buffer = Buffer.concat(buffer);
                    try {
                        // read the image buffer with jimp
                        const image = await Jimp.read(buffer);
                        this._processImage(image, cb);
                    } catch (error) {
                        // console.log(error);
                        cb(error);
                    }
                });
            console.timeEnd("stream");
        }

        // multer requires this for destroying files
        _removeFile(req, file, cb) {
            if (file.filename) {
                let matches, pathsplit;
                const filename = file.filename;
                const _path = path.join(this.uploadPath, filename);
                const paths = [];

                // delete the file properties
                delete file.filename;
                delete file.destination;
                delete file.baseUrl;
                delete file.storage;

                // create paths for responsive images
                if (this.options.responsive) {
                    pathsplit = _path.split("/");
                    matches = pathsplit.pop().match(/^(.+?)_.+?\.(.+)$/i);
                    if (matches) {
                        paths = ["lg", "md", "sm"].map((size) => {
                            return `${pathsplit.join("/")}/${
                                matches[1]
                            }_${size}.${matches[2]}`;
                        });
                    }
                } else {
                    paths = [_path];
                }
                // delete the files from the filesystem
                paths.forEach((path) => {
                    fs.unlink(path, cb);
                });
            } else {
                cb();
            }
        }
    }

    // create a new instance with the passed options and return it
    return new AvatarStorage(options);
};

module.exports = { AvatarStorage };
