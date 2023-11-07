import {
  CalloutLink,
  Content,
  Grid,
  GridItem,
  GridItemDetails,
  GridItemMedia,
  NebulaLink,
} from '../primitives';
import { array, shape, string } from 'prop-types';

import { HREF_NEBULA } from '../../common/constants';
import React from 'react';
import { withContent } from '../../common/utils';

const AboutNebula = ({
  content: {
    about: { title, text },
    callout: { large },
  },
}) => (
  <Content className="AboutNebula">
    <Grid>
      <GridItem>
        <GridItemDetails title={title}>
          {text.items.map((paragraph, i) => {
            if (i === 0) {
              return (
                <p key={i}>
                  <NebulaLink />
                  {paragraph}
                </p>
              );
            }

            return <p key={i}>{paragraph}</p>;
          })}

          <CalloutLink href={HREF_NEBULA} text={'Get the desktop app'} />
        </GridItemDetails>
      </GridItem>
      <GridItem>
        <a href={HREF_NEBULA}>
          <GridItemMedia src="/nebula-app.png" alt="Nebula" />
        </a>
      </GridItem>
    </Grid>
  </Content>
);

AboutNebula.propTypes = {
  content: shape({
    about: shape({
      title: string,
      text: shape({
        items: array,
      }),
    }),
    callout: shape({
      large: string,
    }),
  }),
};

export default withContent(AboutNebula);
