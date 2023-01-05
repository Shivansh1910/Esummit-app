import React, {PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import Pdf from 'react-native-pdf';

export const PdfComponent: React.FC<PropsWithChildren<{url: string}>> = ({
  url,
}) => {
  const source = {
    uri: url,
    cache: true,
  };

  return (
    <Pdf
      trustAllCerts={false}
      source={source}
      onLoadComplete={(numberOfPages, filePath) => {
        console.log(`Number of pages: ${numberOfPages}`);
      }}
      onPageChanged={(page, numberOfPages) => {
        console.log(`Current page: ${page}`);
      }}
      onError={error => {
        console.log(error);
      }}
      onPressLink={uri => {
        console.log(`Link pressed: ${uri}`);
      }}
      style={styles.pdf}
    />
  );
};

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
