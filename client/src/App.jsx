import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Input, Flex, Box, Link } from "@chakra-ui/react";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState("");

  const initialValues = {
    address: "",
  };
  return (
    <div className="App">
      <header className="App-header">
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            setData("");
            try {
              const resp = await axios({
                method: "POST",
                url: "/api/url/shorten",
                withCredentials: false,

                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Headers":
                    "Origin, X-Requested-With, Content-Type, Accept",
                },

                data: values,
              });
              setData(resp.data);
            } catch (error) {
              console.log(error);
            }
            // setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            //   setSubmitting(false);
            // }, 2000);
          }}
        >
          {({ values, isSubmitting, handleChange }) => (
            <Form>
              {" "}
              <div>
                {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(data, null, 2)}</pre> */}
                <pre></pre>
              </div>
              <Text fontSize="3xl" color="teal" mb="3">
                URL SHORTENER
              </Text>
              <Field as={Input} name="address" placeholder="Enter url"></Field>
              <Button
                mt="2"
                colorScheme={`${isSubmitting ? "gray" : "teal"}`}
                color={`${isSubmitting ? "black" : ""}`}
                variant="solid"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        <Box mt="3">
          <Text mb="2">Your shortended url:</Text>
          <Link href={data.shortened} isExternal>
            {data.shortened}
          </Link>
        </Box>
      </header>
    </div>
  );
}

export default App;
