import Icon from './Icon.jsx';

interface SelectProps {
  readonly children: React.ReactNode;
  readonly theme: { [key: string]: string | undefined };
  [key: string]: unknown;
}

const Select = ({ children, theme, ...props }: SelectProps) => (
  <div className={theme['next-pagination__select']}>
    <select {...props}>{children}</select>
    <span className={theme['next-pagination__select-suffix']}>
      <Icon icon="expand-more" />
    </span>
  </div>
);

export default Select;
