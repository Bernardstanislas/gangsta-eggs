import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {Accordion} from './Accordion';
import {Subtitle} from './Subtitle';

type Props = {
  imageUrl: string;
  name: string;
  title: string;
  children: React.ReactNode;
  linkedinUrl?: string;
};

export const TeamMember: React.FC<Props> = ({
  imageUrl,
  title,
  name,
  children,
  linkedinUrl,
}) => {
  return (
    <div className="">
      <img src={imageUrl} alt={title} className="mb-2" />
      <Subtitle>
        {name}
        {linkedinUrl && (
          <a href={linkedinUrl} className="ml-3">
            <FontAwesomeIcon icon={['fab', 'linkedin']}></FontAwesomeIcon>
          </a>
        )}
      </Subtitle>
      <Accordion title={title}>{children}</Accordion>
    </div>
  );
};
