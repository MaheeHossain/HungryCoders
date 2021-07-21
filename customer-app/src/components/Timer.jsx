import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const MAX_SECONDS = 900; // time limit allowed to prepare order

// pad the number with a leading 0
function padLeadingZero(num) {
  num = num.toString();
  if (num.length < 2) num = "0" + num;
  return num;
}

function TimerProgress(props) {

  var minutes = Math.floor(props.value / 60);
  var seconds = props.value - minutes * 60;

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" size="4rem" style={{color: props.value > 0 ? "orange" : "green"}}
        value={(MAX_SECONDS - props.value)*100/MAX_SECONDS} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <p>{minutes}:{padLeadingZero(seconds)}</p>
      </Box>
    </Box>
  );
}

TimerProgress.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function Timer(props) {

  function getDifferenceInSeconds(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / 1000;
  }

  const timeElapsed = getDifferenceInSeconds(new Date, new Date(props.orderTime));
  const timeRemaining = MAX_SECONDS - timeElapsed; // time remaining to prepare the order
  const [progress, setProgress] = useState(Math.floor(timeRemaining)); // progress bar
  const [isStopped, setIsStopped] = useState(false);

  // if the preparation finishes first we want it to go down to 0:00
  //
  // TODO:
  // change colour according to preparing/finished
  // make it stop when 0 is reached
  // 15 mins passed : mark order late and apply discount 
  // 5 mins left : non-refundable (grey out the bin and edit buttons)
  // 

  const stopTimer = () => {
    //clearInterval(timer);
    setIsStopped(true);
  }
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress > 0 ? prevProgress - 1 : 0));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <TimerProgress value={progress} />;
}
