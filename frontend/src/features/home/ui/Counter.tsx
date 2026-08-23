"use client";

import { increment, decrement, incrementByAmount } from "../state/counterSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value);

  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Count: {count}</h2>

      <button className="border bg-amber-100" onClick={() => dispatch(increment())}>+</button>

      <button className="border bg-amber-100" onClick={() => dispatch(decrement())}>-</button>

      <button className="border bg-amber-100" onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}
