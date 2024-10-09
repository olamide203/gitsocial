import useSWR from "swr";
import User from "../components/User/User";
import { useFollowees } from "~/hooks/useFollowees";

function Following() {
  const { data: followees, error } = useFollowees();
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-auto-fill-2 md:grid-cols-auto-fill grid-flow-row-dense">
      {followees &&
        followees.data.map((profile, index) => (
          <User username={profile.login} key={index} />
        ))}
    </div>
  );
}

export default Following;
