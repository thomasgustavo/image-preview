import { Component } from "react";
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css'
import './MyViewer.css'


class MyViewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            state: 'state'
        }
    }

    componentDidMount() {
        if (this.props.visible) {
            this.gallery = new Viewer(document.getElementById('images'), {
                inline: true,
                minWidth: 800,
                minHeight: 600,
                zoomRatio: 0.3,
                minZoomRatio: 0.1,
                maxZoomRatio: 3,
                title: false,
                toolbar: {
                    prev: true,
                    next: true,
                    zoomIn: true,
                    zoomOut: true,
                    reset: true
                },
                // toolbar: false,
                // navbar: false,
            });
        }
    }

    render() {
        const listImages = this.props.images.map((image) => {
            return <li key={image}><img src={image} alt=""></img></li>
        })

        return (
            <div >
                <div style={{ width: 800, height: 600 }}>
                    <ul id="images" class="imagesList" style={{ display: 'none' }}>
                        {listImages}
                    </ul>
                </div>
            </div>
        );
    }
}

export default MyViewer
