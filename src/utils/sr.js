let sr = null;

const loadScrollReveal = async () => {
  if (typeof window === 'undefined') {return null;}
  if (sr) {return sr;}

  const module = await import('scrollreveal');
  sr = module.default ? module.default() : module();
  return sr;
};

const srSafe = {
  reveal: async (...args) => {
    const instance = await loadScrollReveal();
    if (instance) {return instance.reveal(...args);}
    return null;
  },
  clean: async (...args) => {
    const instance = await loadScrollReveal();
    if (instance && instance.clean) {return instance.clean(...args);}
    return null;
  },
  destroy: async (...args) => {
    const instance = await loadScrollReveal();
    if (instance && instance.destroy) {return instance.destroy(...args);}
    return null;
  },
};

export default srSafe;
