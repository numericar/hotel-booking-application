import { useEffect } from "react";
import { useState } from "react"
import { getAllRooms } from "../utils/ApiFunction";
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

export default function RoomCarousel() {
    const [rooms, setRooms] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        getAllRooms().then((data) => {
            setRooms(data);
        }).catch((err) => setErrorMsg(err.message)).finally(() => {
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <div className="mt-5">loading rooms...</div>

    if (errorMsg != "") return <div className="text-danger mb-5 mt-5">Error: {errorMsg}</div>
    
    return (
        <section className="bg-light mb-5 mt-5 shadow">
            <Link to={"/browse-all-rooms"} className="hotel-color text-center">Browse all rooms</Link>
            <Container>
                <Carousel indicators={false}>
                    {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
                        <>
                            <Carousel.Item key={index}>
                                <Row>
                                    {rooms.slice(index * 4., index * 4 + 4).map((room) => (
                                        <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                                            <Card>
                                                <Link to={"/book-room/" + room.id}>
                                                    <Card.Img 
                                                        variant="top" 
                                                        src={"data:image/png;base64," + room.photo} 
                                                        alt="room photo"
                                                        className="w-100"
                                                        style={{ height: "200px" }}>

                                                    </Card.Img>
                                                </Link>
                                                <Card.Body>
                                                    <Card.Title className="hotel-color">{room.roomType}</Card.Title>
                                                    <Card.Title className="room-price">{room.roomPrice}</Card.Title>

                                                    <div className="flex-shrink-0">
                                                        <Link className="btn btn-sm btn-hotel" to={"/book-room/" + room.id}>
                                                            Book Now
                                                        </Link>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Carousel.Item>
                        </>
                    ))}
                </Carousel>
            </Container>
        </section>
    )
}