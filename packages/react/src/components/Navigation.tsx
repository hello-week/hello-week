interface NavigationProps {
    month?: string;
    year?: string;
    onPrevMonth?: () => void;
    onNextMonth?: () => void;
}

export const Navigation = ({
    month,
    year,
    onNextMonth,
    onPrevMonth,
}: NavigationProps): React.ReactElement => {
    return (
        <div className="navigation">
            <button className="prev" onClick={onPrevMonth}>◀</button>
            <div className="period">
                {`${month} ${year}`}
            </div>
            <button className="next" onClick={onNextMonth}>▶</button>
        </div>
    );
};
