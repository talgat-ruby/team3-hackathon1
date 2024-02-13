function AddonItem({title, price, period} : {title: string, price: number, period: string}) {
    return (
        <div className="flex justify-between items-center">
        <div className="text-[#9699AA] text-sm leading-5">{title}</div>
        <div className="text-[#022959] text-sm leading-5">+${price}/{period}</div>
      </div>
    );
}

export default AddonItem;