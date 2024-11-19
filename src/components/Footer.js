import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { fetchTulisan } from "../api/Api";
import InstagramIcon from '@mui/icons-material/Instagram';

const markerIcon = new Icon({
    iconUrl: require("../images/marker.png"),
    iconSize: [38,38]
});

const Footer = () => {
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    );

    const style = {
        height: matches ? "330px" : "700px",
        backgroundColor:"#000035", 
        marginTop:"15px", color:"white", 
        display:"flex",
        flexDirection: matches ? 'row' : 'column', 
        justifyContent:"space-around", 
        alignItems:"center"
    };

    const [tulisanData, setTulisanData] = useState({
        alamat: '',
        telepon: '',
        whatsapp: '',
        email: ''
    });

    useEffect(() => {
        const storedTulisanData = localStorage.getItem('tulisanData');
        
        if (storedTulisanData) {
            setTulisanData(JSON.parse(storedTulisanData));
        } else {
            fetchTulisan()
              .then(data => {
                const newTulisanData = data[0];
                setTulisanData(newTulisanData);
                localStorage.setItem('tulisanData', JSON.stringify(newTulisanData));
              })
              .catch(error => {
                console.error('Error fetching tulisan:', error);
              });
        }
    }, []);

    return (
        <div>
            <div style={{ ...style }}>
                <div style={{ width:"250px", height:"250px"}}>
                    <b>Lokasi</b>
                    <MapContainer center={[-7.0837637900659, 110.31054493973727]} zoom={100} style={{ width:"80%", height:"80%" }}>
                        <TileLayer 
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-7.0837637900659, 110.31054493973727]} icon={markerIcon}>
                            <Popup>
                                <Link to="https://maps.app.goo.gl/HSmxKvypizA7m6dN9">open in map</Link>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
                <div style={{ width:"250px", height:"250px"}}>
                    <b>Alamat</b>
                    <p style={{ textAlign:"justify" }}>{tulisanData.alamat}</p>
                </div>
                <div style={{ width:"280px", height:"250px"}}>
                    <b>Kontak Kami</b>
                    <p>
                        <WhatsAppIcon style={{ fontSize: 20, marginRight: 10 }} />
                        <span style={{fontSize: '13px'}}>WhatsApp: {tulisanData.telepon}</span><br/>
                        <EmailIcon style={{ fontSize: 20, marginRight: 10 }} />
                        <span style={{fontSize: '13px'}}>Email: {tulisanData.email}</span><br/>
                        <InstagramIcon style={{ fontSize: 20, marginRight: 10 }} />
                        <span style={{fontSize: '13px'}}>Instagram: {tulisanData.instagram}</span>
                    </p>
                </div>
            </div>
            <div style={{backgroundColor: '#000070', textAlign: 'center', color: 'white', fontSize: '14px', fontFamily: 'sans-serif'}}>
                <p>© 2024 | All Rights Reserved by Balai Benih Ikan Mijen</p>
            </div>
        </div>
    );
};

export default Footer;