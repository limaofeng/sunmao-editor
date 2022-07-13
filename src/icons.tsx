import { store } from '@asany/icons';

const icons = [
  {
    name: 'Search',
    svg: `<svg  width="1em" height="1em" fill="currentColor"  viewBox="0 0 11 12" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_679_10480)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.45285 7.65991C5.77551 8.18652 4.92438 8.5 4 8.5C1.79086 8.5 0 6.70923 0 4.5C0 2.29077 1.79086 0.5 4 0.5C6.20914 0.5 8 2.29077 8 4.5C8 5.42432 7.68643 6.27563 7.15991 6.95288L10.3535 10.1465L9.64645 10.8535L6.45285 7.65991ZM7 4.5C7 6.15674 5.65686 7.5 4 7.5C2.34314 7.5 1 6.15674 1 4.5C1 2.84326 2.34314 1.5 4 1.5C5.65686 1.5 7 2.84326 7 4.5Z" fill="black"/>
    </g>
    <defs>
    <clipPath id="clip0_679_10480">
    <rect width="11" height="11" fill="white" transform="translate(0 0.5)"/>
    </clipPath>
    </defs>
    </svg>`,
  },
  {
    name: 'ListItemBack',
    svg: `<svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.914 7.708L14.206 7L9 11.999L14.206 16.999L14.914 16.291L10.414 11.999L14.914 7.708Z" fill="black" fill-opacity="0.8"/>
    </svg>`,
  },
  {
    name: 'ComponentInstance',
    svg: `<svg width="1em" height="1em" fill="currentColor" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
        <path
        d="M.828 7L7 .828 13.172 7 7 13.172.828 7zM7 11.828L11.828 7 7 2.172 2.172 7 7 11.828z"
        fillRule="evenodd"
        fillOpacity="1"
        stroke="none"
        />
    </svg>`,
  },
  {
    name: 'Loading',
    svg: `<svg version="1.1" id="L9" width="1em" height="1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
      <path fill="#18a0fb" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
        <animateTransform 
           attributeName="transform" 
           attributeType="XML" 
           type="rotate"
           dur="1s" 
           from="0 50 50"
           to="360 50 50" 
           repeatCount="indefinite" />
    </path>
  </svg>`,
  },
];

store.addIcons('SunmaoEditor', '1.0', icons);
