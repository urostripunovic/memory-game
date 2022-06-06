import { Component } from "react";
import './SingleCard.css'

class SingleCard extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleChoice(this.props.card);
    }

    render() {
        return(
            <div className='card'>
              <div> 
                <img className='front' src={this.props.card.src} alt='card front' />
                <img 
                    className='back' 
                    src='/img/cover.png' 
                    onClick={this.handleClick} 
                    alt='card back' 
                    />
              </div>
            </div>
        );
    }
}
export default SingleCard