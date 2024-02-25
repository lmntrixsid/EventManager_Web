import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Form from "react-bootstrap/Form";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}


export default function Keyword_autocomplete(props) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    
    if(props.keyword.length > 0)
    {
      props.getAutoComplete();
    }

  }, [props.keyword]);

  React.useEffect(() => {
    if (!open) {
      // setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: "100%" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      loadingText = {<CircularProgress size = {20}/>}
      isOptionEqualToValue={(option, value) => option.text === value.text}
      getOptionLabel={(option) => option.text}
      options={props.options}
      loading={props.loading}
      onChange={(_, newValue) => {
				props.handleKeyword(newValue.text);
			}}
      renderInput={(params) => (
				<div ref={params.InputProps.ref}>
          <Form.Control {...params.inputProps} value={props.keyword} type="text" 
            onChange={(event)=>props.handleKeyword(event.target.value)} id = "keyword" required/>
				</div>
			)}
    />
  );
}
