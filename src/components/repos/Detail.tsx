import { FC } from 'react';

export const RepoDetail: FC<{
  id: number;
  fullName: string;
  owner: { avatar_url: string };
  description: string;
  visible?: boolean;
  toggleVisibility: Function
}> = ({ id, fullName, owner, description, visible = true, toggleVisibility }) => {
  const color = visible ? "lightgrey" : "red";
  return (
    <div className='card repo-card'>
      <div className='row'>
        <div className='avatar col-md-3 d-flex align-items-center justify-content-center'>
          <img src={owner.avatar_url} className="img-fluid" alt="User Avatar Image" />
        </div>
        <div className='col-md-7'>
          <div className='card-body'>
            <h5 className='card-title'>{fullName}</h5>
            <p className='card-text'>{description}</p>
          </div>
        </div>
        <div className='col-md-2 my-auto text-center'>
          <a role='button' title="Click this to toggle visibility of this repo" onClick={() => toggleVisibility(id, !visible)}>
            <span style={{ fontSize: "2.5rem", color }}>&#8854;</span>
          </a>
        </div>
      </div>
    </div>
  );
};
