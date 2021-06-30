# PCFGridActivity

A custom component that allows you to see activities for custom and native related entities. Simulates the behavior of a Rollup Relationship.
Suppose we have an entity of orders.
This entity has a number of activities (Order Task 1, Order Task 2, Order Email 1 etc.).
In addition to activities, a child entity of Items is connected to the Order entity. Each of the Items also have their own activities (Item 1 Task 1, Item 2 Task 1 etc.).
The customer set a task: I want to see all the activities at the Order level. In other words, in the Order form, I want to see both the activities of the order itself and its items.

![image](https://user-images.githubusercontent.com/86048404/122371370-7f0c6800-cf68-11eb-811d-d80a91f0fa1d.png)

Of course, we can cook up an SSRS report, but we're not looking for easy ways, are we? :)

In this case - our own control, which allows us to display all the necessary activities from any related entities.

![image](https://user-images.githubusercontent.com/86048404/122372201-28ebf480-cf69-11eb-8a82-ab5fb497b4bf.png)

![image](https://user-images.githubusercontent.com/86048404/122372391-4caf3a80-cf69-11eb-91e2-01600bbfa22c.png)

There is an awesome components involved in this control - datatables.css and datatables.js (https://datatables.net/).
It is allows you to pre-configure sorting and search.
Result:
![image](https://user-images.githubusercontent.com/86048404/123954458-1635de80-d9b1-11eb-9cbf-6a89cb7995e1.png)

And this one (with search):
![image](https://user-images.githubusercontent.com/86048404/123816864-58ebae00-d900-11eb-99f1-78ad1d93aaa3.png)

Unfortunately, this PCF has cons (known issues) and TODO-tasks.
Firstly, native export in Excel allows you to download only those records that belong to the parent, because it operates with `context.parameters.dataSet`.
Secondly, I would like to add universality to the code. In the `createTableBody` method, data is being built and I want the control to understand itself where which column is, where is what data type and automatically build the table, not via:
```
statuscode.innerText = results[i]["statecode@OData.Community.Display.V1.FormattedValue"];
```
Third, of course, we need to work with the styles. So that this table looks like the native one.

**Despite the fact that the task was real, the component itself was made for educational purposes.**
**If you decide to use this component, please use it at your own risk!**

_Your ideas and wishes will be warmly welcomed!_

