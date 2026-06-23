import React from 'react';
import { GetProps, styled, ThemeableStack } from 'tamagui';

export const GridFrame = styled(ThemeableStack, {
  pointerEvents: 'box-none',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  variants: {
    row: {
      false: {
        flexDirection: 'column'
      },
      true: {
        flexDirection: 'row'
      },
      xxs: {
        $gtXXs: {
          flexDirection: 'row'
        }
      },
      xs: {
        $gtXs: {
          flexDirection: 'row'
        }
      },
      sm: {
        $gtSm: {
          flexDirection: 'row'
        }
      },
      md: {
        $gtMd: {
          flexDirection: 'row'
        }
      },
      tablet: {
        $gtTablet: {
          flexDirection: 'row'
        }
      },
      lg: {
        $gtLg: {
          flexDirection: 'row'
        }
      },
      xl: {
        $gtXl: {
          flexDirection: 'row'
        }
      },
      xxl: {
        $gtXXl: {
          flexDirection: 'row'
        }
      }
    },
    wrap: {
      true: {
        flexWrap: 'wrap'
      },
      xxs: {
        $gtXXs: {
          flexWrap: 'wrap'
        }
      },
      xs: {
        $gtXs: {
          flexWrap: 'wrap'
        }
      },
      sm: {
        $gtSm: {
          flexWrap: 'wrap'
        }
      },
      md: {
        $gtMd: {
          flexWrap: 'wrap'
        }
      },
      tablet: {
        $gtTablet: {
          flexWrap: 'wrap'
        }
      },
      lg: {
        $gtLg: {
          flexWrap: 'wrap'
        }
      },
      xl: {
        $gtXl: {
          flexWrap: 'wrap'
        }
      },
      xxl: {
        $gtXXl: {
          flexWrap: 'wrap'
        }
      }
    },
    spacing: {
      '...space': (space) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const pad = space.substring(0, 1) + '-' + space.substring(1);
        return {
          marginLeft: pad,
          marginTop: pad
        };
      }
    },
    parentSpacing: {
      '...space': (space) => {
        return {
          paddingLeft: space,
          paddingTop: space
        };
      }
    },
    container: {
      true: {
        flexGrow: 1,
        minWidth: 0
      },
      false: {
        flexGrow: 0
      }
    },
    centered: {
      ':boolean': (bool) => {
        if (bool) {
          return {
            alignItems: 'center',
            justifyContent: 'center'
          };
        }
      }
    },
    xxs: {
      auto: {
        flexGrow: 1,
        maxWidth: '100%',
        minWidth: 0
      },
      true: {
        flexGrow: 1,
        maxWidth: '100%',
        minWidth: 0
      },
      ':number': (nr) => ({
        flexBasis: `${(nr / 12) * 100}%`,
        maxWidth: `${(nr / 12) * 100}%`,
        flexGrow: 1
      })
    },
    xs: {
      auto: {
        $gtXs: {
          flexGrow: 1,
          maxWidth: '100%',
          minWidth: 0
        }
      },
      true: {
        $gtXs: {
          flexGrow: 1,
          maxWidth: '100%',
          minWidth: 0
        }
      },
      ':number': (nr) => ({
        $gtXs: {
          flexBasis: `${(nr / 12) * 100}%`,
          maxWidth: `${(nr / 12) * 100}%`,
          flexGrow: 1
        }
      })
    },
    sm: {
      auto: {
        $gtSm: {
          flexGrow: 1,
          maxWidth: '100%',
          minWidth: 0
        }
      },
      true: {
        $gtSm: {
          flexGrow: 1,
          maxWidth: '100%',
          minWidth: 0
        }
      },
      ':number': (nr) => ({
        $gtSm: {
          flexBasis: `${(nr / 12) * 100}%`,
          maxWidth: `${(nr / 12) * 100}%`,
          flexGrow: 1
        }
      })
    },
    md: {
      auto: {
        $gtMd: {
          flexGrow: 1,
          maxWidth: '100%',
          minWidth: 0
        }
      },
      true: {
        $gtMd: {
          flexGrow: 1,
          maxWidth: '100%',
          minWidth: 0
        }
      },
      ':number': (nr) => ({
        $gtMd: {
          flexBasis: `${(nr / 12) * 100}%`,
          maxWidth: `${(nr / 12) * 100}%`,
          flexGrow: 1
        }
      })
    },
    tablet: {
      auto: {
        $gtTablet: {
          flexGrow: 1,
          maxWidth: '100%',
          minWidth: 0
        }
      },
      true: {
        $gtTablet: {
          flexGrow: 1,
          maxWidth: '100%',
          minWidth: 0
        }
      },
      ':number': (nr) => ({
        $gtTablet: {
          flexBasis: `${(nr / 12) * 100}%`,
          maxWidth: `${(nr / 12) * 100}%`,
          flexGrow: 1
        }
      })
    },
    lg: {
      auto: {
        $gtLg: {
          flexGrow: 1,
          maxWidth: '100%',
          minWidth: 0
        }
      },
      true: {
        $gtLg: {
          flexGrow: 1,
          maxWidth: '100%',
          minWidth: 0
        }
      },
      ':number': (nr) => ({
        $gtLg: {
          flexBasis: `${(nr / 12) * 100}%`,
          maxWidth: `${(nr / 12) * 100}%`,
          flexGrow: 1
        }
      })
    },
    xl: {
      auto: {
        $gtXl: {
          flexGrow: 1,
          maxWidth: '100%',
          minWidth: 0
        }
      },
      true: {
        $gtXl: {
          flexGrow: 1,
          maxWidth: '100%',
          minWidth: 0
        }
      },
      ':number': (nr) => ({
        $gtXl: {
          flexBasis: `${(nr / 12) * 100}%`,
          maxWidth: `${(nr / 12) * 100}%`,
          flexGrow: 1
        }
      })
    },
    xxl: {
      auto: {
        $gtXXl: {
          flexGrow: 1,
          maxWidth: '100%',
          minWidth: 0
        }
      },
      true: {
        $gtXXl: {
          flexGrow: 1,
          maxWidth: '100%',
          minWidth: 0
        }
      },
      ':number': (nr) => ({
        $gtXXl: {
          flexBasis: `${(nr / 12) * 100}%`,
          maxWidth: `${(nr / 12) * 100}%`,
          flexGrow: 1
        }
      })
    }
  } as const
});

export type GridProps = GetProps<typeof GridFrame>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const Grid = GridFrame.extractable(({ children, spacing, ...props }: GridProps) => {
  const childrenWithSpacingProps = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      parentSpacing: spacing
    })
  );
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    <GridFrame spacing={spacing} {...props}>
      {childrenWithSpacingProps}
    </GridFrame>
  );
});
