import { useFollowers } from "~/hooks/useFollowers";
import User from "../components/User/User";

export default () => {
  const { data: followers, error } = useFollowers();
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-auto-fill-2 md:grid-cols-auto-fill grid-flow-row-dense">
      {followers &&
        followers.data.map((profile, index) => (
          <User username={profile.login} key={index} />
        ))}
    </div>
  );
};
