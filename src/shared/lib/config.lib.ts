import config = require('config');

export function getConfig(key: string, defaultValue: any = null) {
  try {
    const value = config.get(key);
    if (typeof value === 'undefined') {
      return defaultValue;
    }
    return value;
  } catch (error) {
    console.log('🚀 ~ file: getConfig.ts ~ line 12 ~ getConfig ~ error', error);
  }
}
