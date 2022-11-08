function formatAddress(address) {
  if (!address.includes("#")) return address;
  return address.replace("#", "%23");
}

export default formatAddress;
