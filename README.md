# PCFGridActivity
A custom component that allows you to see activities for custom and native related entities. Mimics Rollup Relationship behavior.

![image](https://user-images.githubusercontent.com/86048404/122371370-7f0c6800-cf68-11eb-811d-d80a91f0fa1d.png)

Unfortunately, these results cannot be achieved by standard means, so you have to reinvent the wheel. In this case - our own control, which allows you to display all the necessary activities from any related entities.

![image](https://user-images.githubusercontent.com/86048404/122372201-28ebf480-cf69-11eb-8a82-ab5fb497b4bf.png)

![image](https://user-images.githubusercontent.com/86048404/122372391-4caf3a80-cf69-11eb-91e2-01600bbfa22c.png)

There is an awesome components involved in this control - datatables.css and datatables.js (https://datatables.net/).
It is allows you to pre-configure sorting and search.
Result:
![image](https://user-images.githubusercontent.com/86048404/123816405-f692ad80-d8ff-11eb-9d45-4b781ec112d4.png)

And this one (with search):
![image](https://user-images.githubusercontent.com/86048404/123816864-58ebae00-d900-11eb-99f1-78ad1d93aaa3.png)

Unfortunately, this PCF has cons (knows issues) and TODO-tasks.
Firstly, native export in Excel allows you to download only those records that belong to the parent, because it operates with `context.parameters.dataSet`.
Secondly, I would like to add universality to the code. In the `createTableBody` method, data is being built and I want the control to understand itself where which column is, where is what data type and automatically build the table, not via:
```
statuscode.innerText = results[i]["statecode@OData.Community.Display.V1.FormattedValue"];
```
Third, of course, we need to work with the styles. So that this table looks like the native one.

Your ideas and wishes will be warmly welcomed!

