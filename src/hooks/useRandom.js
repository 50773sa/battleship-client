function useRandom() {

  
      const getRandom = ((arr) => Math.floor(Math.random() * arr.length))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  

  return getRandom()
}

export default useRandom