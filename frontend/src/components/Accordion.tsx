import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

export const Accordion: React.FC<Props> = ({title, children}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-gray-300 shadow-bevel text-gray-900">
      <div
        className="flex justify-between items-center text-lg px-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="hidden max-h-0 max-h-screen rotate-0 rotate-180"></div>
        <h4 className="py-2.5 font-bold">{title}</h4>
        <div
          className={`transition duration-500 transform rotate-${
            isOpen ? '180' : '0'
          }`}
        >
          <FontAwesomeIcon icon="angle-down" />
        </div>
      </div>
      <div
        className={`transition-max-height duration-400 overflow-hidden max-h-${
          isOpen ? 'screen' : '0'
        }`}
      >
        <div className="p-4 space-y-3">{children}</div>
      </div>
    </div>
  );
};
