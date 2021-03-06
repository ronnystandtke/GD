import * as React from 'react';
import BrowserExport from './BrowserExport';
import PhoneIphone from 'material-ui/svg-icons/hardware/phone-iphone';
import LaptopMac from 'material-ui/svg-icons/hardware/laptop-mac';
import Folder from 'material-ui/svg-icons/file/folder';
import Devices from 'material-ui/svg-icons/device/devices';

export const getBrowserExporters = () => [
  {
    name: 'Android (& iOS coming soon)',
    renderIcon: props => <PhoneIphone {...props} />,
    description:
      'Package your game for Android directly from GDevelop. iOS support is coming soon!',
    key: 'localonlinecordovaexport',
    ExportComponent: BrowserExport,
  },
  {
    name: 'Web (upload online)',
    renderIcon: props => <Devices {...props} />,
    description:
      'Upload your game online directly from GDevelop and share the link to players. Play to your game using your browser on computers and mobile phones.',
    key: 'locals3export',
    ExportComponent: BrowserExport,
  },
  {
    name: 'Local folder',
    renderIcon: props => <Folder {...props} />,
    description:
      'Build the game locally as a HTML5 game. You can then export it on website like Itch.io or Kongregate.',
    key: 'localexport',
    ExportComponent: BrowserExport,
    advanced: true,
  },
  {
    name: 'iOS & Android (manual)',
    renderIcon: props => <PhoneIphone {...props} />,
    description:
      'Build the game locally as a Cordova project, and export it manually then to iOS or Android with Cordova developers tools.',
    key: 'localcordovaexport',
    ExportComponent: BrowserExport,
    advanced: true,
  },
  {
    name: 'Windows/macOS/Linux (coming soon)',
    renderIcon: props => <LaptopMac {...props} />,
    description: 'Package your game as an app for Windows, macOs or Linux.',
    disabled: true,
    key: 'localonlineelectronexport',
    ExportComponent: BrowserExport,
  },
  {
    name: 'Cocos2d-JS',
    renderIcon: props => <PhoneIphone {...props} />,
    description:
      'Export your game using Cocos2d-JS game engine. The game can be compiled for Android or iOS if you install Cocos2d-JS developer tools.',
    key: 'localcocos2dexport',
    ExportComponent: BrowserExport,
    experimental: true,
  },
];
