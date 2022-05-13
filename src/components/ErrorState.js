import React from 'react'

export const ErrorState = ({ SadSpock }) => (
  <div
    style={{
      textAlign: 'center',
    }}
  >
    <h3>Looks like we couldnt find your Team</h3>
    <img src={SadSpock} alt="Sad Spock" />
    <h3>Spock is now sad</h3>
    <h3
      style={{
        paddingTop: '20px',
      }}
    >
      Join a Twitch Team or build your own Custom Team!
    </h3>
  </div>
)
