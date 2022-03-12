import ActivityCard from "components/ActivityCard/ActivityCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./CategoryView.module.scss";

export default function CategoryView({ activities, trip_id }) {
  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
  }

  return (
    <div className={styles.columnContainer}>
      {/* {activities?.length > 0 ? ( */}
      <DragDropContext>
        {/* {[1, 2, 3, 4].map((_, i) => ( */}
        <div className={styles.column}>
          <header className={styles.categoryHeader}>
            <h2>Category title</h2>
          </header>
          <Droppable droppableId={1}>
            {(provided) => (
              <div
                className={styles.activities}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {activities.map((activity, index) => {
                  return (
                    <Draggable draggableId={activity._id} index={index}>
                      {(draggableProvided) => (
                        <div
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          ref={draggableProvided.innerRef}
                          className={styles.activity}
                        >
                          <ActivityCard key={activity._id} activity={activity} trip_id={trip_id} />
                        </div>
                      )}
                    </Draggable>
                  );
                })}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className={styles.column}>
          <header className={styles.categoryHeader}>
            <h2>Category title</h2>
          </header>
          <Droppable droppableId={2}>
            {(provided) => (
              <div
                className={styles.activities}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {activities.map((activity, index) => {
                  return (
                    <Draggable draggableId={activity._id + 1} index={index}>
                      {(draggableProvided, snapshot) => (
                        <div
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          ref={draggableProvided.innerRef}
                          className={styles.activity}
                        >
                          <ActivityCard key={activity._id} activity={activity} trip_id={trip_id} />
                        </div>
                      )}
                    </Draggable>
                  );
                })}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        {/* ))} */}
      </DragDropContext>
      {/* ) : ( */}
      {/* <p>No Activities</p> */}
      {/* )} */}
    </div>
  );
}
