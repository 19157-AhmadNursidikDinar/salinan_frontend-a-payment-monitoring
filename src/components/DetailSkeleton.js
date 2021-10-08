import React from "react";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";

const BodySkeleton = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs>
        <Typography component="div" variant="h4">
          <Skeleton />
        </Typography>
      </Grid>
    </Grid>
  );
};

export default function SkeletonTypography() {
  return (
    <div>
      <Typography component="div" variant="h1">
        <Skeleton />
        <BodySkeleton />
        <BodySkeleton />
        <BodySkeleton />
        <BodySkeleton />
        <BodySkeleton />
        <BodySkeleton />
      </Typography>
    </div>
  );
}