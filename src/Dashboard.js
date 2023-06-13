import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

export default () => (
  <Card>
    <CardHeader title="Selamat Datang di Halaman Administrator" />
    <CardContent>
      Silakan bernavigasi ke users dan posts untuk melakukan manipulasi data...
    </CardContent>
  </Card>
);
