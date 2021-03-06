// @flow
import React from 'react';
import BrowserS3FileSystem from './BrowserS3FileSystem';
import BrowserPreviewLinkDialog from './BrowserPreviewLinkDialog';
import { findGDJS } from './BrowserS3GDJSFinder';
import assignIn from 'lodash/assignIn';
import { GDevelopGamesPreview } from '../../Utils/GDevelopServices/ApiConfigs';
import { makeTimestampedId } from '../../Utils/TimestampedId';
const awsS3 = require('aws-sdk/clients/s3');
const gd = global.gd;

const {
  destinationBucket,
  accessKeyId,
  secretAccessKey,
  region,
  destinationBucketBaseUrl,
} = GDevelopGamesPreview;

const awsS3Client = new awsS3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
  correctClockSkew: true,
});

export default class BrowserS3PreviewLauncher {
  static _openPreviewWindow = (project: gdProject, url: string): any => {
    const windowObjectReference = window.open(url, `_blank`);
    return {
      url,
      windowObjectReference,
    };
  };

  static _prepareExporter = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      findGDJS(({ gdjsRoot, filesContent }) => {
        if (!gdjsRoot) {
          console.error('Could not find GDJS');
          return reject();
        }
        console.info('GDJS found in ', gdjsRoot);

        const prefix = makeTimestampedId();

        const outputDir = destinationBucketBaseUrl + prefix;
        const browserS3FileSystem = new BrowserS3FileSystem({
          filesContent,
          awsS3Client,
          bucket: destinationBucket,
          bucketBaseUrl: destinationBucketBaseUrl,
          prefix,
        });
        const fileSystem = assignIn(
          new gd.AbstractFileSystemJS(),
          browserS3FileSystem
        );
        const exporter = new gd.Exporter(fileSystem, gdjsRoot);
        exporter.setCodeOutputDirectory(destinationBucketBaseUrl + prefix);

        resolve({
          exporter,
          outputDir,
          browserS3FileSystem,
        });
      });
    });
  };

  static launchLayoutPreview = (
    project: gdProject,
    layout: gdLayout
  ): Promise<any> => {
    if (!project || !layout) return Promise.reject();

    return BrowserS3PreviewLauncher._prepareExporter().then(
      ({ exporter, outputDir, browserS3FileSystem }) => {
        exporter.exportLayoutForPixiPreview(project, layout, outputDir);
        exporter.delete();
        return browserS3FileSystem
          .uploadPendingObjects()
          .then(() => {
            const finalUrl = outputDir + '/index.html';
            return BrowserS3PreviewLauncher._openPreviewWindow(
              project,
              finalUrl
            );
          })
          .then(({ url, windowObjectReference }) => {
            if (!windowObjectReference) {
              return { dialog: <BrowserPreviewLinkDialog url={url} /> };
            }
          });
      }
    );
  };

  static launchExternalLayoutPreview = (
    project: gdProject,
    layout: gdLayout,
    externalLayout: gdExternalLayout
  ): Promise<any> => {
    return Promise.reject('Not implemented');
  };
}
