import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Icon, Image,  Card, Rating, Modal, Button, Message, Dimmer, Loader } from 'semantic-ui-react';
import InfiniteScroll from 'redux-infinite-scroll';
import { fetchImages } from './actions/appActions';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 25,
      images: []
    };
  }
  componentWillMount() {
    this._loadMore();
  }
  _loadMore() {
    const { dispatch } = this.props;
    const { page, limit } = this.state;
    dispatch(fetchImages(page, limit));
    this.setState({
      page: page + 1,
      limit: 25,
    });
  }
  _renderImages() {
    const { images } = this.props;
    let imgElements = images.map((img, i) =>
      <Card key={img.index}>
        <span className="thumb-cover">
          <Image src={img.src} />
        </span>
        <Card.Content>
          <Card.Header>{img.name}</Card.Header>
          <Card.Meta>{img.category}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Rating icon='heart' defaultRating={img.rating} maxRating={5} />
          <Modal basic size='small' trigger={<Button basic color='green' size='mini' floated='right'>Detail</Button>} closeIcon='close'>
            <Modal.Header>
              {img.name}
            </Modal.Header>
            <Modal.Content>
              <Image src={img.src} />
              <br/>
              <Rating icon='heart' defaultRating={img.rating} maxRating={5} />
              <br/>
              <p>{img.about}</p>
            </Modal.Content>
          </Modal>
        </Card.Content>
      </Card>
      )
    
    return imgElements;
  }
  render() {
    const { images, loading, isEnded } = this.props;
    return (
      <div className="app">
        <Header as='h2' icon textAlign='center'>
          <Icon name='image' circular />
          <Header.Content>
            Gallery Images
          </Header.Content>
        </Header>
        <Container>
              <InfiniteScroll className="ui five cards" items={this._renderImages()} elementIsScrollable={false} 
              loadingMore={loading} hasMore={!isEnded} loadMore={this._loadMore.bind(this)}/>
              {isEnded && <Message positive>
                <Message.Header>All items are loaded. Copyright &copy; 2017. Nguyen Van Trung - trung.aptvn@gmail.com</Message.Header>
              </Message>}
        </Container>
      </div>
    )
  }
}
App.propTypes = {
	loading: PropTypes.bool.isRequired,
  images: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
	error: PropTypes.object,
	success: PropTypes.bool,
  isEnded: PropTypes.bool
}
function mapStateToProps(state) {
  const { getImages } = state;
  const { data: images, loading, success, error, isEnded } 
		= getImages || { images: [], loading: true, success: false, error: undefined, isEnded: false };

  return {
    images,
		loading, 
		success, 
		error,
    isEnded
  }
}

export default connect(mapStateToProps)(App);