import { FC } from 'react';

export const RepoDetail: FC<{
  name: string;
  fullName: string;
  owner: object;
  description: string;
}> = ({ name, fullName, owner, description }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};
