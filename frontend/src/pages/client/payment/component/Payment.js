import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import '../styles/payment.css'
import { Link } from "react-router-dom";


export default function Payment(props) {

    const [loading, setLoading] = useState(true);
    
    const [bcaTransfer, setBCATransfer] = useState(false);
    const [bniTransfer, setBNITransfer] = useState(false);
    const [mandiriTransfer, setMandiriTransfer] = useState(false);


    const formatter = new Intl.NumberFormat("id-ID", {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });

    const finishDate = new Date(props.data.finish_date_at);
    const startDate = new Date(props.data.start_date_at);

    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const timeDifference = finishDate.getTime() - startDate.getTime();
    const dayDifference = Math.round(timeDifference / millisecondsPerDay);

    const handleBCAClick = (e) => {
        e.preventDefault();
        setBCATransfer(true);
        setBNITransfer(false);
        setMandiriTransfer(false)
        props.handleClick('bca')
    };

    const handleBNIClick = (e) => {
        e.preventDefault();
        setBNITransfer(true);
        setBCATransfer(false);
        setMandiriTransfer(false)
        props.handleClick('bni')
    };

    const handleMandiriClick = (e) => {
        e.preventDefault();
        setMandiriTransfer(true)
        setBNITransfer(false);
        setBCATransfer(false);
        props.handleClick('mandiri')
    };
    //  const order = localStorage.getItem('order')
    //  const data = JSON.parse(order)
    //  console.log(data)

    return (
        <div className="container payment">
            <div className="row row-payment">
                <div className="col d-flex mt-5 col-detail payment-description">
                    <div className="w-100-payment">
                        <div className="title-payment">
                            <h5>Pilih Bank Transfer</h5>
                            <p>Kamu bisa membayar dengan transfer melalui ATM, internet Banking atau Mobile Banking</p>
                        </div>
                        <div className="bank-option">
                            <div>
                                <Row>
                                    <Col>
                                        <Button
                                            variant="light"
                                            onClick={handleBCAClick}
                                        >BCA</Button>
                                    </Col>
                                    <Col>
                                        <p>BCA Transfer</p>
                                    </Col>
                                    <Col> {bcaTransfer ? <span>&#10003;</span> : null}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button
                                            variant="light"
                                            onClick={handleBNIClick}
                                        >BNI</Button>
                                    </Col>
                                    <Col>
                                        <p>BNI Transfer</p>
                                    </Col>
                                    <Col> {bniTransfer ? <span>&#10003;</span> : null}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button
                                            variant="light"
                                            onClick={handleMandiriClick}
                                        >MANDIRI</Button>
                                    </Col>
                                    <Col>
                                        <p>Mandiri Transfer</p>
                                    </Col>
                                    <Col> {mandiriTransfer ? <span>&#10003;</span> : null}</Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 mt-5 detail-payment">
                    <Row>
                        <div className="car-name-payment">
                            <p>{props.data.name}</p>
                        </div>

                    </Row>
                    <Row>
                        <Accordion className="accordion-detail" defaultActiveKey="1">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header >
                                    Total
                                </Accordion.Header>
                                <Accordion.Body>
                                    <h5>Harga</h5>
                                    <ul>
                                        <li>
                                            <Row>
                                                <Col>Sewa Mobil {formatter.format(props.data.price)}  x {dayDifference} hari </Col>
                                                <Col>{formatter.format( props.data.price * dayDifference)}</Col>
                                            </Row></li>
                                    </ul>
                                    <h5>Biaya Lainya</h5>
                                    <ul>
                                        <li>
                                            <Row>
                                                <Col>Pajak </Col>
                                                <Col>Termasuk</Col>
                                            </Row></li><li>
                                            <Row>
                                                <Col>Biaya Makan Sopir </Col>
                                                <Col>Termasuk</Col>
                                            </Row></li>
                                    </ul>
                                    <h5>Belum Termasuk</h5>
                                    <ul>
                                        <li>Bensin</li>
                                        <li>Tol dan parkir</li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                    </Row>
                    <Row>
                        <div className="total-payment">
                            <Row>
                                <Col>Total</Col>
                                <Col>{formatter.format( props.data.price * dayDifference)}</Col>
                            </Row>
                        </div>

                    </Row>
                    <Row>
                        <Link to={'/payment/validation'}>
                            <div className="d-grid gap-2">
                                <Button
                                    variant="flat"
                                    disabled={!bcaTransfer && !mandiriTransfer && !bniTransfer}
                                >
                                    Bayar
                                </Button>
                            </div>
                        </Link>
                    </Row>
                </div>
            </div>
        </div>
    );
}

Payment.defaultProps = {
    handleClick: () => '',
}