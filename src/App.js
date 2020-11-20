import React,{ Component } from 'react';
import KeybordItem from './KeybordItem';
import { Container, Row, Col, Navbar, Jumbotron, Alert } from 'react-bootstrap';
import './App.css';

const CHARACTER_LIST    = [
                            ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                            ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'], 
                            ['W', 'X', 'C', 'V', 'B', 'N']];

const RANDOM_WORDS      = ['Abeilles', 'Bord', 'Tonnerre', 'Amerique', 'Harem', 'Prune', 'Date', 'Valise', 'Esclave', 'Epaule'];
const DEFAULT_CHARACTER = '_';

class App extends Component {
  constructor() {
    super();
    this.state = {
      usedCharacterList : [],
      wordToGuess       : this.getRandomWordLetterList(),
      remainingTrials   : 5,
      guesses           : 0,
      result            : '',
      gameOver          : false,
      variant           : ''
    }
    
  }

  characterClickHandler = (character)  => {
    let { usedCharacterList, guesses, remainingTrials , wordToGuess, gameOver, variant, result } = this.state;
    console.log('remaining trials', remainingTrials, 'right answers', guesses);

    if (wordToGuess.includes(character)) {
      guesses += wordToGuess.filter((n) => n === character).length;
      console.log(guesses);

    } else {
      remainingTrials--;;
    }
    
    gameOver = remainingTrials === 0 || guesses === wordToGuess.length;
    result   = remainingTrials === 0 ? "Game Over !! you Lost " : "Congrats you won !!";
    variant  = remainingTrials === 0 ? "danger " : "success";

    this.setState({ 
      remainingTrials   : remainingTrials,
      guesses           : guesses, 
      usedCharacterList : [ ...usedCharacterList, character ],
      gameOver          : gameOver,
      result            : result,
      variant           : variant
    });
    console.log({...this.state})

    
  }

  isUsedCharacter(character) {
    const { usedCharacterList } = this.state;

    return usedCharacterList.includes(character);
  }

  getRandomWordLetterList() {
    return RANDOM_WORDS[Math.floor(Math.random() * RANDOM_WORDS.length)].toUpperCase().split('');
  }

  render() {
    const { 
      wordToGuess, 
      usedCharacterList,
      remainingTrials,
      result,
      guesses,
      gameOver,
      variant
     } = this.state;

    return (
      <div>
      <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="./Icons/gallows.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '} Jeu du pendu
          </Navbar.Brand>
        </Navbar>
        <Jumbotron>
          <Container>
            <Row className='justify-content-md-center' md={1}>
                <Col className='h4' sm='auto' md='auto' lg='auto'>
                  <span>{ `Guesses : ${guesses}` }</span>
                </Col>
                <Col className='h4' sm='auto' md='auto' lg='auto'>
                  <span>{ `Remaining Trials : ${remainingTrials}` }</span>
                </Col>
            </Row>
                { CHARACTER_LIST.map((row, index) => (
                  <Row sm={10} key={ index } className='justify-content-md-center mt-4'>
                    { row.map((character, index) => (
                    <Col xs={1} sm={1} md={1} lg={1} key={index} >
                      <KeybordItem key={ index } index={ index } character={ character } disable={this.isUsedCharacter(character) } onClick={ this.characterClickHandler }/>
                    </Col>
                    )) }
                  </Row>
                )) }
            <Row className='justify-content-md-center mt-3' md={1}>
              <Col sm='auto' md='auto' lg='auto'>
              {
                wordToGuess.map((letter, index) => (
                <span className='mx-1 h2' key={index}>
                  {usedCharacterList.includes(letter) ? letter : DEFAULT_CHARACTER}
                </span> 
                ))
              }
              </Col>
            </Row>
            <Row>
              <Col>
                { gameOver && <Alert variant={variant}> { result } </Alert> }
              </Col>
            </Row>
          </Container>
        </Jumbotron>
          
      </div>
    )
  }
}
export default App;
