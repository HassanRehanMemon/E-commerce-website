import React from 'react'
import { Helmet } from 'react-helmet'

type Props = {
    title: string,
    description: string
}

const Meta = (props: Props) => {
    return (
        <Helmet>
            <title>{props.title}</title>
            <meta name="description" content={`${props.description}`} />
        </Helmet>
    )
}

export default Meta