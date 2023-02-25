using System;
using System.Data;
using System.Web.UI.WebControls;


namespace BedManagement
{
    public partial class SelectionPage : System.Web.UI.Page
    {
        static string PTitle = "";
        bool isDB = false;
        RuleProcessor.Processor CurrentProcessor;

        private void FillControls()
        {
            DataSet SelectionDS = new DataSet();
            string[] QuStrVal = new string[4];
            string[] PickVal = new string[5];
            string[] SelecVal = new string[15];
            string SelMode = "";
            isDB = true;

            CurrentProcessor = (RuleProcessor.Processor)Session["RuleProcessor"];
            //if (Request.QueryString[0] != "" && Request.QueryString[0].Contains("|"))
            if (CurrentProcessor.mvarQueryString != "" && CurrentProcessor.mvarQueryString.Contains("|"))
            {
                //QuStrVal = Request.QueryString[0].Split('|');
                QuStrVal = CurrentProcessor.mvarQueryString.Split('|');
                for (int counter = 0; counter < QuStrVal.Length; counter++)
                {
                    if (QuStrVal[counter].StartsWith("Title"))
                        PTitle = QuStrVal[counter].Substring(QuStrVal[counter].IndexOf(".") + 1);
                    else
                        if (QuStrVal[counter].StartsWith("Mode"))
                    {
                        SelMode = QuStrVal[counter].Substring(QuStrVal[counter].IndexOf(".") + 1);
                        if (SelMode == "1")
                        {
                            SelectionListValue.SelectionMode = ListSelectionMode.Single;
                            cbSelectAll.Visible = false;
                        }
                        else
                        {
                            SelectionListValue.SelectionMode = ListSelectionMode.Multiple;
                            cbSelectAll.Visible = true;
                        }
                    }
                    else
                            if (QuStrVal[counter].StartsWith("PickList"))
                    {
                        if (QuStrVal[counter].Contains("~"))
                        {
                            PickVal = QuStrVal[counter].Substring(QuStrVal[counter].IndexOf(".") + 1).Split('~');
                            isDB = false;
                        }
                        else
                        {
                            PickVal = QuStrVal[counter].Substring(QuStrVal[counter].IndexOf(".") + 1).Split(';');
                            isDB = false;
                        }
                        ListItem[] x1 = new ListItem[PickVal.Length];
                        if (PickVal.Length > 0)
                        {
                            for (int i = 0; i < PickVal.Length; i++)
                            {
                                PickListValues.Visible = true;
                                lblPickList.Visible = true;
                                x1[i] = new ListItem(PickVal[i].Substring(PickVal[i].IndexOf(".") + 1), PickVal[i].Substring(0, PickVal[i].IndexOf(".")));
                                PickListValues.Items.Add(x1[i]);
                            }
                            PickListValues.DataBind();
                        }
                        else
                        {
                            lblPickList.Visible = false;
                            PickListValues.Visible = false;
                        }
                    }
                    else
                                if (QuStrVal[counter].StartsWith("SelectionList"))
                    {
                        if (QuStrVal[counter].Contains("~"))
                        {
                            SelecVal = QuStrVal[counter].Substring(QuStrVal[counter].IndexOf(".") + 1).Split('~');
                            isDB = false;
                        }
                        else
                        {
                            SelecVal = QuStrVal[counter].Substring(QuStrVal[counter].IndexOf(".") + 1).Split(';');
                            isDB = false;
                        }
                        ListItem[] x = new ListItem[SelecVal.Length];
                        for (int i = 0; i < SelecVal.Length; i++)
                        {
                            if (SelecVal[i].IndexOf(".") == -1)
                                x[i] = new ListItem(SelecVal[i], SelecVal[i]);
                            else
                                x[i] = new ListItem(SelecVal[i].Substring(SelecVal[i].IndexOf(".") + 1), SelecVal[i].Substring(0, SelecVal[i].IndexOf(".")));

                            SelectionListValue.Items.Add(x[i]);
                        }
                        SelectionListValue.DataBind();
                    }
                }
                if (CurrentProcessor != null)
                    if (CurrentProcessor.RuleDataSets.Contains("SelectionList") && isDB == true)
                    {
                        SelectionDS = (DataSet)CurrentProcessor.RuleDataSets["SelectionList"];
                        if (SelectionDS.Tables[0].Columns.Count == 2)
                        {
                            SelectionListValue.DataSource = SelectionDS.Tables[0];
                            SelectionListValue.DataTextField = SelectionDS.Tables[0].Columns[1].ColumnName;
                            SelectionListValue.DataValueField = SelectionDS.Tables[0].Columns[0].ColumnName;
                            SelectionListValue.DataBind();
                            SelectionListValue.Visible = true;
                            //GridView1.Visible = false;
                        }
                        else
                            if (SelectionDS.Tables[0].Columns.Count > 1)
                        {
                            //GridView1.DataSource = SelectionDS.Tables[0];
                            //GridView1.DataBind();
                            //GridView1.Columns[0].Visible = false;

                            //GridView1.Visible = true;
                            SelectionListValue.Visible = false;
                        }
                        else if (SelectionDS.Tables[0].Columns.Count == 1)
                        {
                            SelectionListValue.DataSource = SelectionDS.Tables[0];
                            SelectionListValue.DataTextField = SelectionDS.Tables[0].Columns[0].ColumnName;
                            SelectionListValue.DataValueField = SelectionDS.Tables[0].Columns[0].ColumnName;
                            SelectionListValue.DataBind();

                            //GridView1.Visible = true;
                            SelectionListValue.Visible = true;
                        }

                    }

                CurrentProcessor.mvarLastResult = hdnSelectionResult.Value;
                Session["RuleProcessor"] = CurrentProcessor;
            }

        }

        private void SetSelectedValues()
        {
            if (PickListValues.SelectedValue != "")
            {
                hdnSelectionResult.Value = "";
                hdnSelectionResult.Value = PickListValues.SelectedValue + "|" + SelectionListValue.SelectedValue;
            }
            else
                if (SelectionListValue.SelectedValue != "" && SelectionListValue.SelectionMode == ListSelectionMode.Single)
                hdnSelectionResult.Value = SelectionListValue.SelectedValue;
            else
                    if (SelectionListValue.SelectedValue != "" && SelectionListValue.SelectionMode == ListSelectionMode.Multiple)
            {
                hdnSelectionResult.Value = "";
                for (int i = 0; i < SelectionListValue.Items.Count; i++)
                    if (SelectionListValue.Items[i].Selected)
                        hdnSelectionResult.Value = hdnSelectionResult.Value + SelectionListValue.Items[i].Value + "|";
                if (hdnSelectionResult.Value.EndsWith("|"))
                    hdnSelectionResult.Value = hdnSelectionResult.Value.Substring(0, hdnSelectionResult.Value.Length - 1);
            }

            if (cbSelectAll.Checked)
            {
                hdnSelectionResult.Value = "";
                if (PickListValues.SelectedValue != "")
                    hdnSelectionResult.Value = PickListValues.SelectedValue + "|";
                for (int i = 0; i < SelectionListValue.Items.Count; i++)
                    if (SelectionListValue.Items[i].Selected)
                        hdnSelectionResult.Value = hdnSelectionResult.Value + SelectionListValue.Items[i].Value + "|";
                if (hdnSelectionResult.Value.EndsWith("|"))
                    hdnSelectionResult.Value = hdnSelectionResult.Value.Substring(0, hdnSelectionResult.Value.Length - 1);
            }

            if (CurrentProcessor == null)
                CurrentProcessor = (RuleProcessor.Processor)Session["RuleProcessor"];

            CurrentProcessor.mvarLastResult = hdnSelectionResult.Value;
            Session["RuleProcessor"] = CurrentProcessor;

        }

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                FillControls();
                this.SetFocus(txtSearch);
            }
            Title = PTitle;
            SetSelectedValues();
        }

        protected void cbSelectAll_CheckedChanged(object sender, EventArgs e)
        {
            if (cbSelectAll.Checked)
            {
                for (int i = 0; i < SelectionListValue.Items.Count; i++)
                {
                    SelectionListValue.Items[i].Selected = true;
                    //SelectionListValue.SelectedIndexes = SelectionListValue.SelectedIndexes + "," + i;

                }
                SetSelectedValues();
            }

            else
            {
                for (int i = 0; i < SelectionListValue.Items.Count; i++)

                    SelectionListValue.Items[i].Selected = false;

                SelectionListValue.SelectedIndex = -1;
                SetSelectedValues();
            }
        }

        protected void txtSearch_TextChanged(object sender, EventArgs e)
        {
            DataSet SelectionDS = new DataSet();
            string[] SelecVal = new string[15];
            string[] QuStrVal = new string[4];
            System.Collections.Generic.List<string> lst = new System.Collections.Generic.List<string>();
            isDB = true;
            RuleProcessor.Processor CurrentProcessor;
            CurrentProcessor = (RuleProcessor.Processor)Session["RuleProcessor"];
            //if (Request.QueryString[0] != "" && Request.QueryString[0].Contains("|"))
            //{
            //QuStrVal = Request.QueryString[0].Split('|');
            //for (int counter = 0; counter < QuStrVal.Length; counter++)
            //if (QuStrVal[counter].StartsWith("SelectionList"))
            //{
            //if (QuStrVal[counter].Contains("~"))
            //{
            //    SelecVal = QuStrVal[counter].Substring(QuStrVal[counter].IndexOf(".") + 1).Split('~');
            //    isDB = false;
            //}
            //else
            //{
            //    SelecVal = QuStrVal[counter].Substring(QuStrVal[counter].IndexOf(".") + 1).Split(';');
            //    isDB = false;
            //}

            if (txtSearch.Text.Trim() != "")
            {

                ListItem[] x = new ListItem[SelectionListValue.Items.Count];
                for (int i = 0; i < SelectionListValue.Items.Count; i++)
                {
                    if (SelectionListValue.Items[i].Text.ToLower().Contains(txtSearch.Text.Trim()))
                    {
                        lst.Add(SelectionListValue.Items[i].Text + "|" + SelectionListValue.Items[i].Value);
                    }
                }

                SelectionListValue.Items.Clear();
                for (int i = 0; i < lst.Count; i++)
                {
                    x[i] = new ListItem(lst[i].Split('|')[0], lst[i].Split('|')[1]);
                    SelectionListValue.Items.Add(x[i]);
                }
                SelectionListValue.DataBind();
                //}
                if (CurrentProcessor != null)
                    if (CurrentProcessor.RuleDataSets.Contains("SelectionList") && isDB == true)
                    {
                        SelectionListValue.Items.Clear();
                        SelectionDS = (DataSet)CurrentProcessor.RuleDataSets["SelectionList"];
                        for (int i = 0; i < SelectionDS.Tables[0].Rows.Count; i++)
                            if (SelectionDS.Tables[0].Rows[i][SelectionDS.Tables[0].Columns.Count - 1].ToString().ToUpper().StartsWith(txtSearch.Text.ToUpper()))
                            {
                                SelectionListValue.Items.Add(new ListItem(SelectionDS.Tables[0].Rows[i][SelectionDS.Tables[0].Columns.Count - 1].ToString(), SelectionDS.Tables[0].Rows[i][0].ToString()));
                                SelectionListValue.DataBind();
                            }

                    }


            }
            else
            {
                SelectionListValue.Items.Clear();
                FillControls();
            }

            this.SetFocus(txtSearch);
            //}

            //protected void btnOK_Click(object sender, EventArgs e)
            //{
            //    CurrentProcessor = (RuleProcessor.Processor)Session["RuleProcessor"];
            //    CurrentProcessor.mvarLastResult = hdnSelectionResult.Value;
            //    Session["RuleProcessor"] = CurrentProcessor;
            //}

        }
    }
}
