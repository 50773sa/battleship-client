import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default function Grid(props) {


  return (
    <Container>
        <Row className='row'>
          {props.refs.map((text,index)=> (
            <Col key={index}>
              {text}
            </Col>
          ))}
        </Row>
        {props.rows.map((obj, index)=>{
          <Row className='row' key={index}>
            <Col key={index}>
              {props.rows[index]}
            </Col>
            {props.columns.map((obj, index) =>(
              <Col key={index}>
                {props.rows[obj -1]}
                {props.columns[index]}
              </Col>
          ))}
          </Row>
        })}
    </Container>
  )
}


