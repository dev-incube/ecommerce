const omisePublicKey = process.env.REACT_APP_OMISE_PUBLIC_KEY || 'pkey_test_5fx8usme86ob7q5zubw'
window.Omise.setPublicKey(omisePublicKey)

export default window.Omise
