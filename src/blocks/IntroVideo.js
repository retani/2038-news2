import React from "react"
import styled from 'styled-components'

import MainVideo from '../components/MainVideo'
import {p as P, Block} from '../components/HtmlElements'
import { 
  BlockListItem, 
  ButtonBlock,
  Spacer,
  BlockWrapper } from '../components'

import { genericFields } from '../helpers/misc'
import { hasFile } from '../helpers/validators'
import { colors, spaces, typoSizes, typoStyles, blockTypoSnippet } from '../../config/styles'

const blockLabel = "INTRO VIDEO"

export function IntroVideo({ data }) {
  const {text,text2,videoId, file, hide, usePdf, link} = data
  return (
    <BlockWrapper label={blockLabel} hide={hide}>
      <MainVideo vimeoId={videoId} />
      <Block
        typoSize={typoSizes.moduleMedium}
        typoStyle={typoStyles.RobotoMonoRegular}  
        spaceBottom={spaces.medium}
      >
        {text}
      </Block>
      <SmallText>
        <span>{text2}</span>
      </SmallText>
      { (file && usePdf || !usePdf && link) &&
        <>
          <Spacer space={spaces.small} />
          { !usePdf ?
            link && <ButtonBlock href={link} title={link} theme="blue-on-white">LINK</ButtonBlock>
            :
            hasFile(file, "pdf") && <ButtonBlock theme="blue-on-white" title={file} text=".PDF" href={file} />
          }
        </>
      }
      <Spacer space={spaces.large} />
    </BlockWrapper>
  )
}

const LargeText = styled(P)`
  ${ 
    blockTypoSnippet({ 
      typoSize: typoSizes.moduleSmall, 
      typoStyle: typoStyles.RobotoMonoRegular,
    }) 
  };
  color: ${ colors.blue };
  text-align: center;
`

const SmallText = styled(P)`
  ${ 
    blockTypoSnippet({ 
      typoSize: typoSizes.moduleSmall, 
      typoStyle: typoStyles.RobotoMonoRegular,
    }) 
  };
  color: ${ colors.blue };
  text-align: center;
  span { max-width: 800px; }
  display: flex;
  justify-content: center;  
`

export const IntroVideoBlock = {
  label: blockLabel,
  name: "introVideo",
  itemProps: (item) => ({
    label: <BlockListItem label={blockLabel} preview={item.text} hide={item.hide} />,
  }),  
  defaultItem: {
    videoId: "370256053",
    text: "Today, in the year 2038, we have mastered the large crises. It was a close call, yet, we just about made it. After the total financial melt-down in the year 2022, the world came to its senses. We live in radical democracy and radical bureaucracy, in a society, that knows neither hero nor villain. In a series of films, the German Pavillon shows how we arrived at this era of New Serenity.",
    text2: "The German Pavillon at the Architecture Biennale 2020",
  },
  fields: [
    { name: "videoId", label: "Vimeo Video ID", component: "text" },
    { name: "text", label: "Text", component: "textarea" },
    { name: "text2", label: "Small Text", component: "text" },
    {
      label: 'Link or PDF',
      name: 'usePdf',
      description: 'Choose Link (left) or PDF (right)',
      component: "condition",
      trigger: {
        component: "toggle"
      },
      fields: (usePdf) => {
        return !usePdf ? [
          { name: "link", label: "Link", component: "text", description: "URL, e.g. https://theatlantic.com" },
        ] : [
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
        ]
      }
    },
    ...genericFields
  ],
}
