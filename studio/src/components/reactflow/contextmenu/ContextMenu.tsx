interface ContextMenuProps {
   top?: number;
   left?: number;
   right?: number;
   bottom?: number;
   onClick: () => void;
}

export default function ContextMenu(props: ContextMenuProps) {
   const { top, left, right, bottom } = props;

   return (
      <div
         style={{
            top: top,
            left: left,
            right: right,
            bottom: bottom,
         }}
         className="absolute z-50 bg-white border-2 border-slate-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-[180px] overflow-hidden flex flex-col"
      >
         content goes here
      </div>
   );
}
