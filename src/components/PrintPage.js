import React from "react";
import QRCode from "qrcode.react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const qrStyles = {
  width: "60%",
  height: "auto",
  marginTop: "3rem",
};

function PrintPage({ qrcode }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text>Here's your QR Code for the taking</Text>
        <QRCode style={qrStyles} value={qrcode} renderAs="svg" />
        <Text>Thank you for using IronLogger</Text>
      </Page>
    </Document>
  );
}

export default PrintPage;
