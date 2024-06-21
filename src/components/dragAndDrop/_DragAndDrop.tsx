// 'use client';

// import React, { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';

// const Droppable = dynamic(() => import('@hello-pangea/dnd').then((mod) => mod.Droppable), { ssr: false });
// const Draggable = dynamic(() => import('@hello-pangea/dnd').then((mod) => mod.Draggable), { ssr: false });
// const DragDropContext = dynamic(() => import('@hello-pangea/dnd').then((mod) => mod.DragDropContext), { ssr: false });

// type Item = {
//   content: string;
//   column: number;
//   is_update: boolean;
//   is_delete: boolean;
//   order: number;
// };

// type ItemWithId = Item & {
//   id: string;
// };

// type DragAndDropProps = {
//   initialItems: Omit<ItemWithId, 'id'>[];
//   columnCount: number;
//   onSubmit: (updatedItems: ItemWithId[]) => void;
// };

// const reorder = (list: ItemWithId[], startIndex: number, endIndex: number): ItemWithId[] => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result.map((item, index) => ({
//     ...item,
//     order: index + 1
//   }));
// };

// const move = (source: ItemWithId[], destination: ItemWithId[], droppableSource: any, droppableDestination: any) => {
//   const sourceClone = Array.from(source);
//   const destClone = Array.from(destination);
//   const [removed] = sourceClone.splice(droppableSource.index, 1);
//   destClone.splice(droppableDestination.index, 0, removed);

//   const updatedSource = sourceClone.map((item, index) => ({
//     ...item,
//     order: index + 1
//   }));

//   const updatedDestination = destClone.map((item, index) => ({
//     ...item,
//     order: index + 1,
//     column: +droppableDestination.droppableId + 1 // Adjust column value based on the destination
//   }));

//   const result: { [key: string]: ItemWithId[] } = {};
//   result[droppableSource.droppableId] = updatedSource;
//   result[droppableDestination.droppableId] = updatedDestination;

//   return result;
// };

// const grid = 8;

// const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
//   userSelect: 'none',
//   padding: grid * 2,
//   margin: `0 0 ${grid}px 0`,
//   background: isDragging ? 'lightgreen' : 'grey',
//   ...draggableStyle
// });

// const getListStyle = (isDraggingOver: boolean) => ({
//   background: isDraggingOver ? 'lightblue' : 'lightgrey',
//   padding: grid,
//   width: 250
// });

// export default function DragAndDrop({ initialItems, columnCount }: DragAndDropProps) {
//   const [itemList, setItemList] = useState<ItemWithId[][]>([]);
//   const [deletedItemList, setDeletedItemList] = useState<ItemWithId[]>([]);
//   const [initialItemsId, setInitialItemsId] = useState<ItemWithId[]>([]);

//   useEffect(() => {
//     const itemsWithId = initialItems.map((item, index) => ({
//       ...item,
//       id: `item-${index}-${new Date().getTime()}`
//     }));
//     setInitialItemsId(itemsWithId);

//     const columns = Array.from({ length: columnCount }, () => [] as ItemWithId[]);
//     itemsWithId.forEach((item) => {
//       const columnIndex = item.column - 1;
//       columns[columnIndex].push(item);
//     });
//     setItemList(columns);
//   }, [initialItems, columnCount]);

//   const onDragEnd = (result: any) => {
//     const { source, destination } = result;

//     if (!destination) {
//       return;
//     }
//     const sInd = +source.droppableId;
//     const dInd = +destination.droppableId;

//     if (sInd === dInd) {
//       const items = reorder(itemList[sInd], source.index, destination.index);
//       const newState = [...itemList];
//       newState[sInd] = items;
//       setItemList(newState);
//     } else {
//       const newResult = move(itemList[sInd], itemList[dInd], source, destination);
//       const newState = [...itemList];
//       newState[sInd] = newResult[sInd];
//       newState[dInd] = newResult[dInd];
//       setItemList(newState);
//     }
//   };

//   const addItem = (index: number) => {
//     const newItem = {
//       id: `item-${new Date().getTime()}`,
//       content: `item ${itemList[index].length + 1}`,
//       column: index + 1,
//       is_update: true,
//       is_delete: false,
//       order: itemList[index].length + 1
//     };
//     const newState = [...itemList];
//     newState[index] = [...newState[index], newItem];
//     setItemList(newState);
//   };

//   const removeItem = (columnIndex: number, itemIndex: number) => {
//     const newState = [...itemList];
//     const removedItem = newState[columnIndex].splice(itemIndex, 1)[0];
//     removedItem.is_delete = true;
//     setDeletedItemList((prevDeleted) => [...prevDeleted, removedItem]);

//     const updatedColumn = newState[columnIndex].map((item, index) => ({
//       ...item,
//       order: index + 1
//     }));
//     newState[columnIndex] = updatedColumn;

//     setItemList(newState);
//   };

//   const handleSubmit = () => {
//     const flattenedItems = itemList.flat();
//     const updatedItems = flattenedItems.map((item) => {
//       const initialItem = initialItemsId.find((i) => i.id === item.id);
//       if (initialItem && !item.is_delete) {
//         // is_update 갱신 로직
//         if (initialItem.column !== item.column || initialItem.order !== item.order) {
//           return { ...item, is_update: true };
//         }
//         return { ...item, is_update: false };
//       }
//       return item;
//     });

//     const mergeUpdatedItems = [
//       ...updatedItems,
//       ...deletedItemList.filter((item) => initialItemsId.some((i) => i.id === item.id))
//     ];

//     const payload = mergeUpdatedItems.map(({ id, ...item }) => item);

//     // onSubmit(payload);
//     console.log('payload:', payload);
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column' }}>
//       <div style={{ display: 'flex' }}>
//         <DragDropContext onDragEnd={onDragEnd}>
//           {itemList.map((el, ind) => (
//             <Droppable key={ind} droppableId={`${ind}`}>
//               {(provided: any, snapshot: any) => (
//                 <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
//                   {el.map((item, index) => (
//                     <Draggable key={item.id} draggableId={item.id} index={index}>
//                       {(provided: any, snapshot: any) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
//                         >
//                           <div
//                             style={{
//                               display: 'flex',
//                               justifyContent: 'space-between'
//                             }}
//                           >
//                             <p>{item.order}</p>
//                             <p>{item.content}</p>
//                             <p>{item.is_update && 'update'}</p>
//                             <button type="button" onClick={() => removeItem(ind, index)}>
//                               delete
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                   <button type="button" onClick={() => addItem(ind)}>
//                     Add new item
//                   </button>
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </DragDropContext>
//       </div>
//       <button type="button" onClick={handleSubmit}>
//         제출하기
//       </button>
//     </div>
//   );
// }
