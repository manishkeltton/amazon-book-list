import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import "./App.css";

function App() {
  const [bookLists, setBookLists] = useState([]);

  useEffect(() => {
    getBookLists();
  }, []);

  const getBookLists = () => {
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=search+terms")
      .then((res) => {
        console.log(res.data);
        const val = res.data.items;
        setBookLists(val);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container id="container">
      <Row className="text-center">
        {bookLists.map((bookList) => {
          return (
            <Col md={4} key={bookList.id} className="text-center">
              <img src={bookList.volumeInfo.imageLinks.thumbnail} />
              <p>{bookList.volumeInfo.title + ","}</p>
              <p>{bookList.volumeInfo.authors}</p>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default App;
