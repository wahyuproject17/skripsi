import NavigationBar from "../components/Navbar"
import Headershow from "../components/headerSlideshow"
import Footer from "../components/Footer"
import {React , useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import "../style.css"
import Denah from '../assets/peta.jpg'
import { Icon } from "leaflet"
import { Link } from "react-router-dom"

const markerIcon = new Icon({
    iconUrl: require("../images/marker.png"),
    iconSize: [38,38]
})

const Location = () =>{
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )
    
    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);

    const mapStyle = {
        width: matches ? '600px' : '90%',
        top: '20px',
        height: matches ? '400px' : '300px',
        left: '20px',
        margin: matches ? '0' : 'auto'
    };

    const linkStyle = {
        marginLeft:'20px',
        marginTop: '30px',
        fontSize: '20px',
        color: 'white',
    }

    const container = {
        display: matches ? 'flex' : ''
    }

    return(
        <div style={{ backgroundColor: 'white', height:'120vh' }}>
            <NavigationBar />
            <Headershow/>
            <div style={{ height: '10px', backgroundColor: '#000060', margin: '0 0 20px 0' }}></div>
            <div style={{ ...container }}>
                <div style={{marginTop: '100px', zIndex: 0 }}>               
                    <MapContainer center={[-7.0838611, 110.3105]} zoom={100} style={mapStyle}>
                        <TileLayer 
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                    </MapContainer>
                    <div style={{ ...linkStyle }}>
                        <p style={{color: 'black'}}>Koordinat -7,066708, 110,334175</p>
                        <Link style={{textDecoration:0 }} to={"https://maps.app.goo.gl/3KKccQYEGkJ8JSm17" }>Buka di maps?</Link>
                    </div>
                </div>
                <div style={{ marginLeft:'50px', alignContent:'center', marginTop:'2px', fontWeight: 'bold' }}>
                    <h1 style={{ fontSize:'50px' }}>BALAI BENIH IKAN MIJEN</h1>
                    <p style={{ fontSize:'20px' }}>Tambangan, Kec. Mijen, Kota Semarang, Jawa Tengah 50215</p>
                    <p style={{ fontSize:'20px' }}>Sumber air berasal dari saluran irigasi (bendungan Cangkiran) dan Sumur</p>
                </div>
            </div>
            <div style={{marginLeft: '20px'}}>
                    <h1>Denah Lokasi</h1>
                    <img src={Denah} alt="denah" style={{width: '100%', height: 'auto', maxWidth: matches ? '800px' : '100%'}}/>
                </div>
            <Footer/>
         </div>
    )
}

export default Location
