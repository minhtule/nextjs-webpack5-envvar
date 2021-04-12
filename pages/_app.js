function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = () => {
  // This is to enable SSR mode.
  return {"foo": 123}
}

export default MyApp
