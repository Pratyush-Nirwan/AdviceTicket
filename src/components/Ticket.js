import { useParams, useNavigate } from "react-router-dom"
import '../App.css';
import { FaArrowAltCircleRight } from "react-icons/fa";
import QRCode from "react-qr-code";
import { useState, useEffect } from "react";
import Footer from "./Footer";

const Ticket = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const [advice, setAdvice] = useState("");
    const [linkCopied, setLinkCopied] = useState(false);

    useEffect(() => {
        if (id) {
            if (sessionStorage.getItem('prevAdvice') === id) {
                id = Math.floor(Math.random() * 224) + 1;
                navigate('/advice/' + id);
                fetch('https://api.adviceslip.com/advice/' + id)
                    .then(response => response.json())
                    .then(data => {
                        if (data.slip) {

                            setAdvice(data.slip.advice);
                            sessionStorage.setItem('prevAdvice', id);
                        } else {

                            sessionStorage.setItem('prevAdvice', id);
                            setAdvice("No advice found. Please refresh.");
                        }
                    });

            } else {
                fetch('https://api.adviceslip.com/advice/' + id)
                    .then(response => response.json())
                    .then(data => {
                        if (data.slip) {

                            setAdvice(data.slip.advice);
                            sessionStorage.setItem('prevAdvice', id);
                        } else {

                            sessionStorage.setItem('prevAdvice', id);
                            setAdvice("No advice found. Please refresh.");
                        }
                    });
            }
        } else {
            fetch('https://api.adviceslip.com/advice')
                .then(response => response.json())
                .then(data => {
                    navigate('/advice/' + data.slip.id);
                });
        }
    }, []);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setLinkCopied(true);
    }

    function href(url) {
        window.open(url, '_blank')
    }

    const date = new Date();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const amPm = date.getHours() >= 12 ? 'PM' : 'AM';
    const formattedDate = month + ' ' + day + ' ' + year;
    const formattedTime = `${hours}:${minutes}:${seconds} ${amPm}`;


    return (
        <>
            <div id="ticket">
                <div id="ticket-top">
                    <h1 id="ticket-title"><span className="outline">ADVICE</span><br /><span id="test"><FaArrowAltCircleRight /> Ticket</span></h1>
                    <h3 id="ticket-time" className="printed"><span>{formattedDate}</span><span>{formattedTime}</span></h3>
                </div>
                <div id="ticket-bottom">
                    <h4 id="ticket-id-links" className="printed">
                        <div>
                            <span >Ticket ID:</span>
                            <span >ADVTKT-{id}</span>
                        </div>
                        <div>
                            <span>Links:</span>
                            <span id="github-link" onClick={() => { href('https://github.com/Pratyush-Nirwan/AdviceTicket') }}>Github</span>
                        </div>
                    </h4>
                    <h3 id="advice" className="printed">"{advice}"</h3>
                    <h3>----------------------------------</h3>
                    <h4 className="printed" id="instructions-qr">
                        <div>
                            <span>To Share this advice:</span>
                            <div>
                                <span>Scan the QR</span>
                                <span>or</span>
                                <span
                                    id="copy-link"
                                    onClick={handleCopyLink}
                                >
                                    {linkCopied ? 'Link Copied!' : 'Copy Link'}
                                </span>
                            </div>
                        </div>
                        <QRCode value={window.location.href} size={50} id="qr-code" />
                    </h4>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default Ticket;


//created by pratyush nirwan