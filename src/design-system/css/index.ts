import { Platform } from 'react-native';

export const elevationXSStyle = {
  ...Platform.select({
    native: {
      shadowColor: 'rgba(16, 24, 40, 0.05)',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowRadius: 2,
      shadowOpacity: 0.5,
      elevation: Platform.OS === 'android' ? 1 : 0
    },
    web: {
      boxShadow: '0px 2px 2px rgba(16, 24, 40, 0.05)'
    }
  })
};

export const elevationSMStyle = {
  ...Platform.select({
    native: {
      shadowColor: 'rgba(16, 24, 40, 0.06)',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowRadius: 2,
      shadowOpacity: 0.5,
      elevation: Platform.OS === 'android' ? 2 : 0
    },
    web: {
      boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)'
    }
  })
};

export const elevationMDStyle = {
  ...Platform.select({
    native: {
      shadowColor: 'rgba(16, 24, 40, 0.06)',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowRadius: 4,
      shadowOpacity: 0.5,
      elevation: Platform.OS === 'android' ? 3 : 0
    },
    web: {
      boxShadow: '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)'
    }
  })
};

export const elevationLGStyle = {
  ...Platform.select({
    native: {
      shadowColor: 'rgba(16, 24, 40, 0.03)',
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowRadius: 6,
      shadowOpacity: 0.3,
      elevation: Platform.OS === 'android' ? 4 : 0
    },
    web: {
      boxShadow:
        '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)'
    }
  })
};

export const elevationXLStyle = {
  ...Platform.select({
    native: {
      shadowColor: 'rgba(16, 24, 40, 0.03)',
      shadowOffset: {
        width: 0,
        height: 8
      },
      shadowRadius: 8,
      shadowOpacity: 0.5,
      elevation: Platform.OS === 'android' ? 5 : 0
    },
    web: {
      boxShadow:
        '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)'
    }
  })
};

export const elevation2XLStyle = {
  ...Platform.select({
    native: {
      shadowColor: 'rgba(16, 24, 40, 0.18)',
      shadowOffset: {
        width: 0,
        height: 24
      },
      shadowRadius: 48,
      shadowOpacity: 1,
      elevation: Platform.OS === 'android' ? 6 : 0
    },
    web: {
      boxShadow: '0px 24px 48px -12px rgba(16, 24, 40, 0.18)'
    }
  })
};

export const elevation3XLStyle = {
  ...Platform.select({
    native: {
      shadowColor: 'rgba(16, 24, 40, 0.14)',
      shadowOffset: {
        width: 0,
        height: 32
      },
      shadowRadius: 64,
      shadowOpacity: 0.5,
      elevation: Platform.OS === 'android' ? 7 : 0
    },
    web: {
      boxShadow: '0px 32px 64px -12px rgba(16, 24, 40, 0.14)'
    }
  })
};
