import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Documetn {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage 

        try{
            ctx.renderPage = () =>
            originalRenderPage({
                enhaceApp: App => props =>
                    sheet.collectStyles(<App {...props} />),
            })

            const getInitialProps = await Document.getInitialProps(ctx)

            return{
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement(d)}
                    </>
                )
            }
        } finally {
            sheet.seal()
        }
    }
}