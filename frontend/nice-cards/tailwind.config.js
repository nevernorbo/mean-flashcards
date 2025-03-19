/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      textColor: {
        skin: {
          base: withOpacity('--color-base'),
          muted: withOpacity('--color-muted'),
          faint: withOpacity('--color-faint'),
          faintest: withOpacity('--color-faintest'),
          inverted: withOpacity('--color-inverted'),
          primary: withOpacity('--color-primary'),
        },
      },
      backgroundColor: {
        skin: {
          'color-surface': withOpacity('--color-surface'),
          'color-surface-pop': withOpacity('--color-surface-pop'),
          'color-primary': withOpacity('--color-primary'),
          'color-secondary': withOpacity('--color-secondary'),
          'color-emphasis': withOpacity('--color-emphasis'),
          'color-muted': withOpacity('--color-muted'),
          'color-faint': withOpacity('--color-faint'),
          'color-faintest': withOpacity('--color-faintest'),
        },
      },
      borderColor: {
        skin: {
          'color-surface': withOpacity('--color-surface'),
          'color-primary': withOpacity('--color-primary'),
          'color-secondary': withOpacity('--color-secondary'),
          'color-divider': withOpacity('--color-divider'),
          'color-muted': withOpacity('--color-muted'),
          'color-faint': withOpacity('--color-faint'),
          'color-faintest': withOpacity('--color-faintest'),
        },
      },
      ringColor: {
        skin: {
          'color-ring': withOpacity('--color-ring'),
          'color-primary': withOpacity('--color-primary'),
        }
      },


      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' },
        }
      },
      animation: {
        slideDown: 'slideDown 300ms ease-in-out',
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
