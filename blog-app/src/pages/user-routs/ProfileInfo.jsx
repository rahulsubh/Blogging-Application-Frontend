import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import Base from '../../components/Base'
import ViewUserProfile from '../../components/ViewUserProfile';
import userContext from '../../context/userContext'
import { getUser } from '../../services/user-service';

function ProfileInfo() {

  const object = useContext(userContext);

  const [user, setUser] = useState(null);

  const { userId } = useParams();

  useEffect(() => {
    getUser(userId).then(data => {
      console.log(data);
      setUser({ ...data });
    });
  }, []);

  const userView = () => {
    return (
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <ViewUserProfile user={user} />
        </Col>
      </Row>
    )
  };

  return (
    <Base>
      {user ? userView() : "Loading User Data..."}
    </Base>
  )
}

export default ProfileInfo

