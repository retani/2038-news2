import React, {Fragment} from "react"
import styled from 'styled-components'

//import {p as P} from '../components/HtmlElements'
import Spacer from '../components/Spacer'
import MarkedText from '../components/MarkedText'
import { p as P } from '../components/HtmlElements'
import { BlockListItem, ButtonBlock } from '../components'
import BlockWrapper from '../components/BlockWrapper'

import { hasFile } from '../helpers/validators'
import { genericFields } from '../helpers/misc'
import { colors, spaces, blockTypoSnippet, typoSizes, typoStyles, typoSnippet } from '../../config/styles'

const blockLabel = "QUOTE / FILM"

export function FilmQuote({ data, shade }) {
  const {text, text2, file, hide} = data
  return (
    <BlockWrapper label={blockLabel} hide={hide}>
      <Container shade={shade}>
        <LargeText>
          <div>
            <MarkedText text={text} typoSize={typoSizes.moduleBig}/>
          </div>
        </LargeText>
          {
            text2 && <SmallText>
              <span>{text2}</span>
            </SmallText>
          }
          { 
            hasFile(file, "pdf") && <>
              <ButtonBlock text=".PDF" href={file} /> 
              <Spacer space={spaces.small} />
            </>
          }

      </Container>
    </BlockWrapper>
  )
}

const Container = styled.div`
  background-color: ${colors.white};
  ${({shade})=> shade && `
    background-size: 100% 100px;
    background-repeat: no-repeat;
    background-position: bottom;
    background-image: linear-gradient(to bottom, ${colors.white} 0%, ${colors.bg} 100%);
  `}
  overflow: hidden;
`

const LargeText = styled.div`
  ${ 
    blockTypoSnippet({ 
      typoSize: typoSizes.moduleMedium,
      typoStyle: typoStyles.NeueHaasUnicaBold,
      spaceTop: spaces.medium,
      spaceBottom: spaces.medium,
    }) 
  };
`

const SmallText = styled.div`
  ${ 
    blockTypoSnippet({ 
      typoSize: typoSizes.moduleSmall, 
      typoStyle: typoStyles.RobotoMonoRegular,
      spaceBottom: spaces.small,
    }) 
  };
  text-align: center;
  color: ${ colors.blue };
  span { max-width: 800px; }
  display: flex;
  justify-content: center;
`

export const FilmQuoteBlock = {
  name: "filmquote",
  label: blockLabel,
  itemProps: (item) => ({
    label: <BlockListItem label={blockLabel} preview={item.text} hide={item.hide}/>,
  }),
  defaultItem: {
    text: `???It was due to the new system, that humanity redifined its relation to nature. Today, {nature is an active political agent: land, water, air and light cannot be owned anymore.}???`,
    text2: 'Conversation with Eyal Weizman',
    file: ''
  },
  fields: [
    { name: "text", label: "Text", component: "textarea", description: "Use {} to highlight" },
    { name: "text2", label: "Small Text", component: "text" },
    {
      name: "file",
      label: "PDF",
      component: "file",
      description: '.PDF Upload',
      accept: 'application/pdf',
      clearable: true,
      parse: (file) => `/uploads/pdfs/${file}`,
      uploadDir: () => '/static/uploads/pdfs/', 
    },
    ...genericFields
  ],
}
